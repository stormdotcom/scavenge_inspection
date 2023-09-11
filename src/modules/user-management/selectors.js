import { flow } from "lodash";
import { STATE_REDUCER_KEY } from "./constants";

const getState = (state) => state[STATE_REDUCER_KEY];

const signIn = (state) => state.signIn;
export const getSignIn = flow(getState, signIn);

const signUp = (state) => state.signUp;
export const getSignUp = flow(getState, signUp);

const orgAdmin = (state) => state.orgAdmin;
export const getOrgAdmin = flow(getState, orgAdmin);

const orgList = (state) => state.orgList;
export const getOrgList = flow(getState, orgList);

const signUpManager = (state) => state.signUpManager;
export const getSignUpManager = flow(getState, signUpManager);

const signUpVessel = (state) => state.signUpVessel;
export const getSignUpVessel = flow(getState, signUpVessel);
