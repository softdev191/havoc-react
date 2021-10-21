/**
 * Describes the state of an artifact's import
 * process at any given point
 */
export enum ImportState {
    /**
     * Artifact was created, awaiting upload
     */
    CREATED = 'CREATED',

    /**
     * Artifact is actively being uploaded by a user
     */
    UPLOADING = 'UPLOADING',

    /**
     * An error occured while the artifact
     * was uploading
     */
    UPLOADCANCELLED = 'UPLOADCANCELLED',

    /**
     * Artifact was successfully uploaded,
     * awaiting to be queued for import
     */
    UPLOADED = 'UPLOADED',

    /**
     * Artifact is queued to be imported
     */
    QUEUED = 'QUEUED',

    /**
     * Artifact is being processed by an import worker
     */
    PROCESSING = 'PROCESSING',

    /**
     * Artifact imported successfully without error
     */
    COMPLETED = 'COMPLETED',

    /**
     * Artifact was rejected on the basis of user error
     */
    REJECTED = 'REJECTED',

    /**
     * Artifact failed to import due to a system error
     */
    FAILED = 'FAILED'
}

/**
 * Error codes to reject an Artifact with
 */
export enum ImportErrorCode {
    /**
     * An unknown system error occured
     */
    UNKNOWN = 'UNKNOWN'
}

/**
 * Describes the review state an artifact is in
 */
export enum ReviewState {
    /**
     * Artifact has not yet been submitted for admin review
     */
    NOTSUBMITTED = 'NOTSUBMITTED',

    /**
     * Artifact was submitted for admin review
     */
    SUBMITTED = 'SUBMITTED',

    /**
     * Artifact was approved by an admin or the system
     */
    APPROVED = 'APPROVED',

    /**
     * Artifact was rejected by an admin
     */
    REJECTED = 'REJECTED'
}
