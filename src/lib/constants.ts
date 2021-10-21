export const errorMessages = {
    _500: 'An unknown server-side error occurred',
    _400: 'Bad Request',
    _401: 'Unauthorized',
    _403: 'Forbidden'
} as const;

/**
 * `control` file field names
 */
export enum ControlFields {
    Package = 'Package',
    Name = 'Name',
    Version = 'Version',
    Section = 'Section',
    Architecture = 'Architecture',
    InstalledSize = 'Installed-Size',
    Author = 'Author',
    Maintainer = 'Maintainer',
    Description = 'Description',
    Depiction = 'Depiction'
}

export enum StatusField {
    APPROVED = 'approved',
    VISIBLE = 'visible',
    HIDDEN = 'hidden',
    NEW = 'new',
    REJECTED = 'rejected',
    CHECKPENDING = 'check-pending',
    ACTIVE = 'active',
    LOCKED = 'locked',
    USER = ''
}
