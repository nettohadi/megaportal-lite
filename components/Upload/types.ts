import { AxiosRequestHeaders } from 'axios';

export interface PresignedUrlParam {
  filename: string;
  byte_size: number;
  content_type: string;
}

export interface PresignedUrlResponse {
  url: string;
  headers: AxiosRequestHeaders;
  originalSource: string;
}