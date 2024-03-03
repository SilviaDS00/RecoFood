import React from 'react';
import { ChangePasswordForm } from './ChangePassword/ChangePassword';
import { ChangeUsernameForm } from './ChangeUsername/ChangeUsername';
import { ChangeEmailForm } from './ChangeEmail/ChangeEmail';
import { ChangeWeightHeightForm } from './ChangeWeightHeight/ChangeWeightHeight';
import { ChangeName } from './ChangeName/ChangeName';
import { ChangeAge } from './ChangeAge/ChangeAge';

const ProfileForm = () => {

  return (
    <div className='profileForm'>
      <h3>Cambiar datos del usuario</h3>
        <ChangePasswordForm />
        <ChangeUsernameForm />
        <ChangeEmailForm />
        <h3>Cambiar datos personales</h3>
        <ChangeName />
        <ChangeAge />
        <ChangeWeightHeightForm />

    </div>
  );
};

export default ProfileForm;
