import React, { useCallback } from "react";

export function IsNullOrUndefined(input) {
  return Object.is(input, undefined) || Object.is(input, null);
};

