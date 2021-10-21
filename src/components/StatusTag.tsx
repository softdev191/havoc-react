import { CheckIcon } from '@chakra-ui/icons';
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { GiBackwardTime } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { RiEyeLine, RiEyeOffLine, RiUserLine } from 'react-icons/ri';

import { StatusField } from '../lib/constants';

interface StatusTagProps {
    type?: string;
    text?: string;
}

export const StatusTag = ({
    type = StatusField.USER,
    text = ''
}: StatusTagProps) => {
    const defaultProps = {
        size: 'md',
        variant: 'subtle',
        borderRadius: '4px',
        fontSize: '13px',
        m: '5px 10px 0 0',
        height: '25px'
    };

    switch (type) {
        case StatusField.APPROVED:
            return (
                <Tag {...defaultProps} bg="#51A4A2">
                    <TagLeftIcon boxSize="11px" mr="6px" as={CheckIcon} />
                    <TagLabel>Approved by</TagLabel>
                </Tag>
            );
        case StatusField.VISIBLE:
            return (
                <Tag {...defaultProps} bg="#4299E1">
                    <TagLeftIcon boxSize="15px" mr="4px" as={RiEyeLine} />
                    <TagLabel>Visible</TagLabel>
                </Tag>
            );
        case StatusField.HIDDEN:
            return (
                <Tag {...defaultProps} bg="#4A5568">
                    <TagLeftIcon boxSize="15px" as={RiEyeOffLine} />
                    <TagLabel>Hidden</TagLabel>
                </Tag>
            );
        case StatusField.NEW:
            return (
                <Tag {...defaultProps} bg="#51A4A2">
                    <TagLabel>New</TagLabel>
                </Tag>
            );
        case StatusField.REJECTED:
            return (
                <Tag {...defaultProps} bg="#E53E3E">
                    <TagLeftIcon boxSize="14px" mr="4px" as={MdClose} />
                    <TagLabel>Rejected</TagLabel>
                </Tag>
            );
        case StatusField.CHECKPENDING:
            return (
                <Tag {...defaultProps} bg="#F6AD55">
                    <TagLabel>System check pending</TagLabel>
                    <TagLeftIcon
                        boxSize="19px"
                        ml="5px"
                        mr="0"
                        as={GiBackwardTime}
                    />
                </Tag>
            );
        case StatusField.ACTIVE:
            return (
                <Tag {...defaultProps} bg="#51A4A2">
                    <TagLeftIcon boxSize="11px" mr="6px" as={CheckIcon} />
                    <TagLabel>Active</TagLabel>
                </Tag>
            );
        case StatusField.LOCKED:
            return (
                <Tag {...defaultProps} bg="#E53E3E">
                    <TagLeftIcon boxSize="14px" mr="4px" as={MdClose} />
                    <TagLabel>Locked</TagLabel>
                </Tag>
            );
        default:
            return (
                <Tag {...defaultProps} bg="#4A5568" maxW="98px">
                    <TagLeftIcon
                        boxSize="16px"
                        mr="3px"
                        maxW="115px"
                        as={RiUserLine}
                    />
                    <TagLabel>{text}</TagLabel>
                </Tag>
            );
    }
};
