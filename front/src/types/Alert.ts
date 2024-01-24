
export interface IAlert {
    title: string;
    description: string;
    confirmBtn: {
        onPress: () => void;
        name?: string
    };
};

export interface IAlertProps { }