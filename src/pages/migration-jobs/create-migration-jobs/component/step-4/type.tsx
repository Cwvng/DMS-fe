export interface MigrationJobType {
  name: string;
  source: string;
  destination: string;
  type: string;
  connectionName: string;
  destinationName: string;
  hostname: string;
}
