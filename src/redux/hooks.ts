import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useAuthToken = () => useAppSelector((state) => state.auth.token);
export const useAuthUser = () => useAppSelector((state) => state.auth.user);
