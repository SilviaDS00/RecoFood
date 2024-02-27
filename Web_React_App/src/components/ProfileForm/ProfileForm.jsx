import React, { useState } from 'react';
import { ChangePasswordForm } from './ChangePassword/ChangePassword';
import { ChangeUsernameForm } from './ChangeUsername/ChangeUsername';
import { ChangeEmailForm } from './ChangeEmail/ChangeEmail';
import { ChangeWeightHeightForm } from './ChangeWeightHeight/ChangeWeightHeight';

const ProfileForm = () => {

  return (
    <div>
        <ChangePasswordForm />
        <ChangeUsernameForm />
        <ChangeEmailForm />
        <ChangeWeightHeightForm />

    </div>
  );
};

export default ProfileForm;
