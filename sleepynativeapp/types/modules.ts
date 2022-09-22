export interface Input {
    id: string;
    type: string;
    name: string;
    label: string;
    helptext: string;
    value: string;
    section: string;
}

export interface BaseSection {
    id: string;
    heading: string;
    page: string;
}

export interface TextSection extends BaseSection {
    type: 'text';
    content: string;
}

export interface ImageSection extends BaseSection{
    type: 'img';
    content: string;
    uri: string;
}

export interface VideoSection extends BaseSection {
    type: 'video'
    uri: string;
}

export interface FormSection extends BaseSection {
    type: 'form';
    form: Input[]
}

export type Section = TextSection | ImageSection | VideoSection | FormSection;
