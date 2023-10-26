// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

library LibError {
    //Oracle
    error Oracle__ErrorPrice();

    //PerBcn
    error UDex__ErrorInsufficientCollateral();
    error UDex__ErrorSize();
    error UDex__PositionAlreadyExist();
    error UDex__InsufficientPositionCollateral();
    error UDex__BreaksHealthFactor();
    error UDex__PositionDoesNotExist();
}
