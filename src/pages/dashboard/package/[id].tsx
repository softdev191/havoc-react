import Package from 'components/package';
import React from 'react';
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

const PackagePage = () => {
    return (
        <div>
            <Package />
        </div>
    );
};

export default PackagePage;
