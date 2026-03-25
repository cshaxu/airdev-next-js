'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import SignInStart from './SignInStart.js';
import SignInVerify from './SignInVerify.js';
export default function SignInSteps() {
    const [step] = useQueryState('step', parseAsString.withDefault('1'));
    const [email, setEmail] = useState();
    if (step === '1' || email === undefined) {
        return _jsx(SignInStart, { setEmail: setEmail });
    }
    if (step === '2') {
        return _jsx(SignInVerify, { email: email });
    }
    return null;
}
//# sourceMappingURL=SignInSteps.js.map