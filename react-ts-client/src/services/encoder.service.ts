import axiosInstance from '../utils/config/axios.config';

export interface EncoderData {
  text: string;
}

export const encodeString = async (data: EncoderData): Promise<EncoderData> => {
  const res = await axiosInstance.post(`/api/encoder`, data);
  return res.data;
};
