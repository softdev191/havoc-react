import 'react-mde/lib/styles/css/react-mde-all.css';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';

const converter = (markdown: string) => {
    return (
        <ReactMarkdown components={ChakraUIRenderer()}>
            {markdown}
        </ReactMarkdown>
    );
};

const DescriptionEditor = (props: {
    value: string | undefined;
    setValue: ((value: string) => void) | undefined;
}) => {
    const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
        'write'
    );
    return (
        <ReactMde
            value={props.value}
            onChange={props.setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            // edit in theme.tsx
            classes={{
                textArea: 'markdown-textArea',
                toolbar: 'markdown-toolbar'
            }}
            toolbarCommands={[
                ['header', 'bold', 'italic', 'strikethrough'],
                ['link', 'quote'],
                ['unordered-list', 'ordered-list']
            ]}
            generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter(markdown))
            }
        />
    );
};

export default DescriptionEditor;
