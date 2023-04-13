import { RootState } from "@/store/store";
import { useAppSelector } from "./useAppSelector";

export const useAuth = () => {
   const { isSuccess } = useAppSelector((state: RootState) => state.auth);
   return isSuccess;
};