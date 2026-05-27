interface IUploadProgress {
  type: 'upload' | 'download';
  loaded: number;
  total: number;
  percentage: number;
}
