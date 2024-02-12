
type HydraView = {
    "@id": string;
    type: string;
    "hydra:first": string;
    "hydra:last": string;
    "hydra:previous": string;
    "hydra:next": string;
};

type HydraMapping = {
    "@type": string;
    variable: string;
    property: string;
    required: true;
};

type HydraSearch = {
    "@type": string;
    "hydra:template": string;
    "hydra:variableRepresentation": string;
    "hydra:mapping": HydraMapping[];
};

export type HydraPaginateResp<T> = {
    "hydra:member": Array<T>;
    "hydra:totalItems": number;
    "hydra:view": HydraView;
    "hydra:search": HydraSearch;
};

export type HydraResp<T> = {
    "@context": "string",
    "@id": "string",
    "@type": "string",
} & T

export interface HydraError {
    '@id': string;
    '@type': string;
    detail: string;
    'hydra:description': string;
    'hydra:title': string;
    status: number;
    title: string;
    type: string;
}