import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Skeleton,
    Stack
} from '@chakra-ui/react';
import DescriptionEditor from 'components/dashboard/package/DescriptionEditor';
import ScreenshotEditor from 'components/dashboard/screenshots/ScreenshotEditor';
import ShowError from 'components/Error/ShowError';
import { PackageSaveRequest } from 'lib/types/SaveRequest';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useReducer, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { ListingPageResponse } from 'types/Listing';

export enum ListingActionType {
    RESET = 'RESET',

    CHANGE_NAME = 'CHANGE_NAME',

    CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION',

    // SCREENSHOTS
    REORDER_SCREENSHOTS = 'REORDER_SCREENSHOTS',

    // new screenshot upload initialized
    ADD_PENDING_SCREENSHOT = 'ADD_PENDING_SCREENSHOT',

    // new screenshot upload completed
    ADD_FINALIZED_SCREENSHOT = 'ADD_SCREENSHOT',

    // delete a screenshot
    REMOVE_SCREENSHOT = 'REMOVE_SCREENSHOT'
}

export type ListingAction = {
    type: ListingActionType;

    // value
    value?: {
        name?: string;

        // description
        description?: string;

        screenshots?: string[];
        screenshotToAdd?: string;
        screenshotToRemove?: string;

        remoteListing?: ListingPageResponse;
    };
};

export type ListingDispatch = (action: ListingAction) => void;

function removeScreenshot(
    screenshotToRemove: string,
    allScreenshots: string[]
): string[] {
    // copy because swr
    const copy = [...allScreenshots];
    const index = copy.indexOf(screenshotToRemove);

    if (index > -1) copy.splice(index, 1);

    return copy;
}

function addScreenshot(
    screenshotToAdd: string,
    allScreenshots?: string[]
): string[] {
    if (!allScreenshots) {
        return [screenshotToAdd];
    }

    return [...allScreenshots, screenshotToAdd];
}

enum ModifiedListingField {
    NAME = 'NAME',
    DESCRIPTION = 'DESCRIPTION',
    SCREENSHOTS = 'SCREENSHOTS'
}

function calculateModifiedFields(
    state: ListingState,
    action: ListingAction
): ModifiedListingField[] {
    let fields: ModifiedListingField[] = [];
    if (state.modifiedFields) {
        fields = state.modifiedFields;
    }

    function setFieldIfRequired(
        field: ModifiedListingField,
        differsCondition: boolean
    ) {
        if (differsCondition) {
            addFieldIfNotExists(field);
        } else {
            removeFieldIfExists(field);
        }
    }

    function removeFieldIfExists(field: ModifiedListingField) {
        fields = fields.filter((e) => e !== field);
    }

    function addFieldIfNotExists(field: ModifiedListingField) {
        if (!fields.includes(field)) {
            fields.push(field);
        }
    }

    if (!state.listing) {
        throw `listing data is missing`;
    }

    switch (action.type) {
        case ListingActionType.CHANGE_NAME: {
            setFieldIfRequired(
                ModifiedListingField.NAME,
                action.value?.name !== state.remoteListing?.displayName
            );
            break;
        }

        case ListingActionType.CHANGE_DESCRIPTION: {
            setFieldIfRequired(
                ModifiedListingField.DESCRIPTION,
                action.value?.description !== state.remoteListing?.description
            );

            break;
        }

        case ListingActionType.REORDER_SCREENSHOTS:
        case ListingActionType.REMOVE_SCREENSHOT:
        case ListingActionType.ADD_FINALIZED_SCREENSHOT: {
            const oldIDs = state.remoteListing?.screenshots || [];
            const newIDs = state.listing.screenshots || [];
            if (newIDs.length != oldIDs.length) {
                addFieldIfNotExists(ModifiedListingField.SCREENSHOTS);
            } else {
                // same length, so we iterate
                let differs = false;
                for (let i = 0; i < oldIDs.length; i++) {
                    if (oldIDs[i] !== newIDs[i]) {
                        addFieldIfNotExists(ModifiedListingField.SCREENSHOTS);
                        differs = true;
                        break;
                    }
                }

                if (!differs) {
                    removeFieldIfExists(ModifiedListingField.SCREENSHOTS);
                }
            }
            break;
        }
        case ListingActionType.ADD_PENDING_SCREENSHOT:
            break;

        default:
            throw new Error(`unknown modified field: ${action.type}`);
    }

    return fields;
}

function listingReducer(
    state: ListingState,
    action: ListingAction
): ListingState {
    // copy entire state so react re-renders
    state = { ...state };

    if (action.type === ListingActionType.RESET) {
        if (!action.value?.remoteListing) return state;

        // copy remoteListing otherwise SWR will think data differs
        const listingCopy = { ...action.value.remoteListing };
        state.remoteListing = listingCopy;
        state.listing = listingCopy;
        state.canSave = true;

        return state;
    }

    if (!state.listing) return state;

    state.listing = {
        ...state.listing,
        id: state.listing.id
    };

    switch (action.type) {
        case ListingActionType.CHANGE_NAME: {
            if (!action.value?.name) {
                return state;
            }

            state.listing.displayName = action.value.name;
            break;
        }
        case ListingActionType.CHANGE_DESCRIPTION: {
            if (!action.value?.description) {
                return state;
            }

            state.listing.description = action.value.description;
            break;
        }
        case ListingActionType.REORDER_SCREENSHOTS: {
            if (!action.value?.screenshots) return state;

            state.listing.screenshots = action.value.screenshots;
            break;
        }
        case ListingActionType.REMOVE_SCREENSHOT: {
            if (!state.listing.screenshots || !action.value?.screenshotToRemove)
                return state;

            state.listing.screenshots = removeScreenshot(
                action.value.screenshotToRemove,
                state.listing.screenshots
            );
            break;
        }
        case ListingActionType.ADD_PENDING_SCREENSHOT: {
            state.listing.screenshots = addScreenshot(
                'PENDING',
                state.listing.screenshots
            );
            state.canSave = false;

            break;
        }
        case ListingActionType.ADD_FINALIZED_SCREENSHOT: {
            if (!state.listing.screenshots || !action.value?.screenshotToAdd)
                return state;

            // remove pending screenshot, then add new one back
            state.listing.screenshots = addScreenshot(
                action.value.screenshotToAdd,
                removeScreenshot('PENDING', state.listing.screenshots)
            );
            state.canSave = true;
            break;
        }

        default:
            throw new Error(`Unhandled change: ${action.type}`);
    }

    state.modifiedFields = calculateModifiedFields(state, action);
    state.hasChanges = state.modifiedFields.length > 0;

    return state;
}

const Placeholder = () => {
    return (
        <Stack width="100%">
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
        </Stack>
    );
};

/**
 *
 * @param state The page state used for building the POST body
 * @returns The POST body to send to the server for saving the package data
 */
function buildSaveBody(
    listing: ListingPageResponse,
    modifiedFields: ModifiedListingField[]
): PackageSaveRequest {
    const body: PackageSaveRequest = {};
    modifiedFields.forEach((field) => {
        switch (field) {
            case ModifiedListingField.NAME:
                body.name = listing.displayName;
                break;
            case ModifiedListingField.DESCRIPTION:
                body.description = listing.description;
                break;
            case ModifiedListingField.SCREENSHOTS:
                body.screenshots = listing.screenshots;
                break;

            default:
                throw new Error(`unhandled field value:${field}`);
        }
    });

    return body;
}

/**
 *
 * @param listing The listing that contains the modified data
 * @param modifiedFields The list of fields from `listing` to send to the server
 * @returns `fetch` response
 */
async function saveListing(
    listing: ListingPageResponse,
    modifiedFields: ModifiedListingField[]
) {
    const body = buildSaveBody(listing, modifiedFields);

    const resp = fetch(`/api/dashboard/package/update/${listing.id}`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(body)
    });

    return resp;
}

interface ListingState {
    // locally modified listing
    listing?: ListingPageResponse;

    // listing retrieved from server, unmodified
    remoteListing?: ListingPageResponse;

    // if the local state differs from remote
    hasChanges?: boolean;

    // fields that have been modified
    modifiedFields?: ModifiedListingField[];

    canSave?: boolean;
}

const PackagePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const dataRoute = `/api/dashboard/package/${id}`;

    const {
        data: remoteListing,
        error
    }: { data?: ListingPageResponse; error?: Error } = useSWR(
        id ? dataRoute : null
    );

    const initialState: ListingState = {};
    const [state, dispatch] = useReducer(listingReducer, initialState);

    const [saving, setSaving] = useState(false);

    // when the listing data has been updated from server
    useEffect(() => {
        if (remoteListing) {
            dispatch({
                type: ListingActionType.RESET,
                value: { remoteListing: remoteListing }
            });
        }
        console.debug('remote listing changed:', remoteListing);
    }, [remoteListing]);

    if (error) {
        return <ShowError err={error} />;
    }

    if (!state || !state.listing) {
        return <Placeholder />;
    }

    return (
        <Box width="100%">
            <Flex justifyContent="space-between">
                <Heading as="h3" size="lg" pb="4" flexGrow={1}>
                    {state.remoteListing?.displayName || 'Missing name'}
                </Heading>
            </Flex>
            <Heading as="h5" size="sm">
                Package Name
            </Heading>
            <Input
                value={state.listing?.displayName}
                onChange={(e) => {
                    dispatch({
                        type: ListingActionType.CHANGE_NAME,
                        value: { name: e.target.value }
                    });
                }}
                placeholder="Here is a sample placeholder"
                size="sm"
                mt={'1em'}
                mb={'1em'}
            />
            <DescriptionEditor
                value={state.listing?.description}
                setValue={(value) => {
                    dispatch({
                        type: ListingActionType.CHANGE_DESCRIPTION,
                        value: { description: value }
                    });
                }}
            />
            <Button
                colorScheme="teal"
                size="lg"
                isLoading={saving}
                disabled={!state.canSave || !state.hasChanges || saving}
                loadingText="Saving"
                onClick={async () => {
                    setSaving(true);

                    // if we dont have either of these we shouldnt be saving
                    if (state.listing && state.modifiedFields) {
                        const res = await saveListing(
                            state.listing,
                            state.modifiedFields
                        );
                        if (res?.ok) {
                            mutate(dataRoute);
                        } else {
                            // TODO: show error to user
                            throw `Unable to save package`;
                        }
                    }

                    setSaving(false);
                }}>
                {state.hasChanges ? 'Save' : 'No Changes'}
            </Button>

            <ScreenshotEditor
                screenshots={state.listing.screenshots}
                dispatch={dispatch}
                listingID={state.listing.id}
            />
            {/* {state.listing.artifacts && (
                <ChangelogsContainer artifacts={state.listing.artifacts} />
            )} */}
        </Box>
    );
};

export default PackagePage;
