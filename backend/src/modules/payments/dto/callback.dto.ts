export class ProviderCallbackDto {
  externalRef: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  details?: any;
}
