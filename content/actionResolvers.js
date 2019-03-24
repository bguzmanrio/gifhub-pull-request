import { WRITE_DOM, ASK_FOR_BODY, ASK_FOR_TITLE } from '../actions';

import { getBody, getPRTitle } from './getDomComponents';

const noOp = () => {};

const insertMDCode = ({ mdCode, targetInput = getBody() }) => {
  const currentValue = targetInput.value;

  targetInput.value = `${currentValue}\n${mdCode}`;
};

export const ACTION_RESOLVERS = {
  [WRITE_DOM]: (payload, next = noOp) => {
    try {
      insertMDCode(payload);
      next({ ok: true });
    } catch (error) {
      next({ ok: false, error });
    }
  },
  [ASK_FOR_BODY]: (_, next = noOp) => {
    try {
      getBody();
      next({ ok: true });
    } catch (error) {
      next({ ok: false, error });
    }
  },
  [ASK_FOR_TITLE]: (_, next = noOp) => {
    try {
      const title = getPRTitle();
      next({ ok: true, payload: { title } });
    } catch (error) {
      next({ ok: false, error });
    }
  },
  default: (_, next, action) => {
    next({ ok: false, error: `No resolver for action ${action}`});
  }
};

export default {
  ACTION_RESOLVERS
};