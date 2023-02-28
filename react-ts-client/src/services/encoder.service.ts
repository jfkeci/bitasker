import axiosInstance from '../utils/config/axios.config';

export interface EncoderData {
  text: string;
}

export const encodeString = async (data: EncoderData): Promise<EncoderData> => {
  const res = await axiosInstance.post(`/api/encode`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    data: data,
  });
  return res.data;
};
