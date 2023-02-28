import axiosInstance from '../utils/config/axios.config';

export interface EncoderData {
  text: string;
}

export const encodeString = async (data: EncoderData): Promise<EncoderData> => {
  const res = await axiosInstance.post(`/api/encode`, {
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  return res.data;
};
