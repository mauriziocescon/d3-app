// declaration.d.ts

declare module "*.html" {
    const content: string;
    export default content;
}

declare module "*.scss" {
    const content: any;
    export default content;
}

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}
