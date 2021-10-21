export interface ListingPageResponse {
    id: string;
    displayName?: string;
    description?: string;
    screenshots?: string[];
    artifacts?: ListingPageArtifacts[];
}

export interface ListingPageArtifacts {
    id: string;
    createdAt: string;
    control: {
        Version: string;
    };
}
