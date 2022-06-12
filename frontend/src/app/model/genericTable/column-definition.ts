import { Alignment } from "./alignment";

export class ColumnDefinition {
    [key: string]: any;
    title: string = '';
    column: string = '';
    subcolumn?: string = '';
    alignment?: Alignment;
    sortable?: boolean;
    visible?: boolean;

    constructor(properties?: ColumnDefinition) {
        if (properties) {
            this.title = properties.title || '';
            this.column = properties.column || '';
            this.subcolumn = properties.subcolumn || '';
            this.alignment = properties.alignment ? properties.alignment : this.alignment;
            this.sortable = typeof properties.sortable === 'boolean' ? properties.sortable : true;
            this.visible = typeof properties.visible === 'boolean' ? properties.visible : true;
        }
    }
}
