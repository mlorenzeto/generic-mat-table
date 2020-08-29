export class ColumnModel {
  /** List of options */
  key: string;
  name: string;
  icon: string;
  order: number;
  propertyType: any;
  canSort: boolean;
  isButton: boolean;

  constructor(options: Partial<ColumnModel> = {}) {
    this.key = options.key;
    this.name = options.name;
    this.icon = options.icon;
    this.order = options.order || 0;
    this.propertyType = options.propertyType;
    this.canSort = options.canSort || false;
    this.isButton = options.isButton || false;
  }
}
