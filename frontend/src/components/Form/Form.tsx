import { Grid, TextField, MenuItem } from '@material-ui/core';
import React, { useState, useContext, useEffect } from 'react';
import { allCountries, countryToFlag } from '../../utils/country';
import { months, days, year, lastDays } from '../../utils/validateDate';
import { AuthContext } from '../../context/AuthContext';
import CustomizedAlerts from '../../ui/Alert/Alert';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import './Form.css';
import BackdropRoller from '../../ui/Backdrop/Backdrop';

interface UserProfile {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  country: string;
}

const Form: React.FC = () => {
  // State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    country: '',
  });

  const [users, setUsers] = useState({});
  const [date, setDate] = useState({
    day: '',
    month: '',
    yearOfBirth: '',
  });
  const [isUpdateReady, setIsUpdateReady] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [originalDate, setOriginalDate] = useState(false);

  // Hooks
  const ctx = useContext(AuthContext);
  const { _id: id } = ctx.user.data;
  const token = ctx.user.token;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const getUser = async () => {
      setBackdrop(true);
      try {
        const currentUser = await axios.get(
          `https://music-box-b.herokuapp.com/api/v1/music-box-api/users/profile/${id}`,
          config
        );
        console.log(currentUser.data.data);

        let { email, firstName, lastName, gender, country, dateOfBirth } = currentUser.data.data;

        if (dateOfBirth) {
          const dob = new Date(dateOfBirth);
          const d = {
            day: `${dob.getDate()}`,
            month: `${dob.getMonth()}`,
            yearOfBirth: `${dob.getFullYear()}`,
          };
          setOriginalDate(true);
          setDate(d);
        }

        setUserProfile({ email, firstName, gender: gender || '', lastName, country: country || '' });
        setBackdrop(false);
      } catch (e) {
        setBackdrop(false);
      }
    };

    getUser();
  }, [id, token]);

  useEffect(() => {
    if (!originalDate) {
      if (date.day && (!date.month || !date.yearOfBirth)) {
        setIsUpdateReady(false);
      } else if (date.month && (!date.day || !date.yearOfBirth)) {
        setIsUpdateReady(false);
      } else if (date.yearOfBirth && (!date.day || !date.month)) {
        setIsUpdateReady(false);
      } else if (date.yearOfBirth && date.day && date.month) {
        setIsUpdateReady(true);
      }
    }
  }, [date, originalDate]);

  // Event Handlers
  const handleChange = (event: { target: Record<string, any> }) => {
    const { name, value } = event.target;
    // const { firstName, lastName, gender, email, country } = userProfile;
    setUserProfile({ ...userProfile, [name]: value });
    if ((name === 'lastName' || name === 'firstName' || name === 'gender' || name === 'email') && !value) {
      setIsUpdateReady(false);
    } else {
      setUserProfile({ ...userProfile, [name]: value });
      if (!date.day && !date.month && !date.yearOfBirth) {
        setIsUpdateReady(true);
      }
      if ((date.day || date.month || date.yearOfBirth) && date.day && date.month && date.yearOfBirth) {
        setIsUpdateReady(true);
      }
    }
  };

  const handleDayChange = (event: { target: Record<string, any> }) => {
    setOriginalDate(false);
    const { name, value } = event.target;

    // check if month has already been set
    if (date.month && name === 'day') {
      // find last day of chosen month
      const chosenMonth = lastDays.find((el: Record<string, any>) => el.month === +date.month);

      // reset day if selected day is greater than last day of the month
      +value > chosenMonth!.lastDay
        ? setDate({ ...date, [name]: chosenMonth!.lastDay })
        : setDate({ ...date, [name]: value });

      // check if day has already been set
    } else if (date.day && name === 'month') {
      // find last day of chosen month
      const chosenMonth = lastDays.find((el: Record<string, any>) => el.month === +value);

      // reset day if selected day is greater than last day of the month
      +date.day > chosenMonth!.lastDay
        ? setDate({ ...date, day: `${chosenMonth!.lastDay}`, month: value })
        : setDate({ ...date, [name]: value });
    } else {
      // set day or month if nothing has been set
      setDate({ ...date, [name]: value });
    }
  };

  const handleUpdate = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      setUsers(userProfile);
      setIsAddingSong(true);
      console.log(users);
      const { email, firstName, lastName, gender } = userProfile as Record<string, any>;

      let newDate = new Date(+date.yearOfBirth, +date.month, +date.day).toLocaleDateString();
      newDate = newDate.split('/').reverse().join('/');

      let newUser = {};
      if (!date.month || !date.day || !date.yearOfBirth) {
        newUser = { email, firstName, lastName, gender };
      } else {
        newUser = { email, firstName, lastName, gender, dateOfBirth: newDate };
      }

      const res = await axios.put(
        `https://music-box-b.herokuapp.com/api/v1/music-box-api/users/profile/${id}`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = {
        data: res.data.data,
        token,
      };

      localStorage.setItem('musicApiUser', JSON.stringify(updatedUser));
      ctx.setUser(JSON.parse(localStorage.getItem('musicApiUser') as string));

      setIsAddingSong(false);
      setAlertMsg('Successfully Updated Profile!');
      setAlertType('success');
      setOpenAlert(true);
      setIsUpdateReady(false);
      console.log('User profile modified');
    } catch (err) {
      console.log(err.response);
      setIsAddingSong(false);
      setAlertMsg('Unable to Update Profile. Please Enter Valid Info');
      setAlertType('error');
      setOpenAlert(true);
      setIsUpdateReady(false);
    }
  };

  // Utils
  const closeAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <>
      <BackdropRoller open={backdrop} />
      <form className='user-profile' onSubmit={handleUpdate}>
        <Grid container justify='space-between' alignItems='center' spacing={5}>
          <Grid item md={6} xs={12}>
            <TextField
              onChange={handleChange}
              value={userProfile.firstName}
              label='First Name'
              name='firstName'
              fullWidth
              type='text'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              onChange={handleChange}
              value={userProfile.lastName}
              label='Last Name'
              fullWidth
              type='text'
              name='lastName'
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              onChange={handleChange}
              value={userProfile.email}
              type='email'
              name='email'
              fullWidth
              label='Email'
              disabled
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              onChange={handleChange}
              className='text-field'
              value={userProfile.gender}
              label='Gender'
              name='gender'
              id='gender'
              select
              fullWidth
            >
              <MenuItem value={'M'} style={{ marginBottom: 5 }}>
                Male
              </MenuItem>
              <MenuItem value={'F'} style={{ marginBottom: 5 }}>
                Female
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              onChange={handleChange}
              className='text-field'
              label='Country'
              value={userProfile.country}
              id='country'
              select
              fullWidth
              name='country'
            >
              {allCountries.map((country, idx) => (
                <MenuItem value={country.name} key={idx}>
                  {countryToFlag(country.abbr)} {country.name} - <span>{country.code}</span>
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item md={4} xs={12}>
            <TextField
              onChange={handleDayChange}
              className='text-field'
              value={date.day}
              label='Day of Birth'
              id='date'
              select
              fullWidth
              name='day'
            >
              {days.map((day: number, idx: number) => (
                <MenuItem value={`${day}`} key={idx} style={{ marginBottom: 5 }}>
                  {day}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              onChange={handleDayChange}
              className='text-field'
              value={date.month}
              label='Month'
              id='month'
              select
              fullWidth
              name='month'
            >
              {months.map((month: string, idx: number) => (
                <MenuItem value={`${idx + 1}`} key={idx} style={{ marginBottom: 5 }}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              onChange={handleDayChange}
              className='text-field'
              value={date.yearOfBirth}
              label='Year'
              id='year'
              select
              fullWidth
              name='yearOfBirth'
            >
              {year().map((el: number) => (
                <MenuItem value={`${el}`} key={el} style={{ marginBottom: 5 }}>
                  {el}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <CustomizedAlerts
          alertMsg={alertMsg}
          alertType={alertType as 'success' | 'error'}
          open={openAlert}
          onClose={closeAlert}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}
        >
          <button disabled={!isUpdateReady} className={isUpdateReady ? 'premium-btn' : 'disable'}>
            {isAddingSong ? <Loader type='Oval' color='#FFFFFF' height={20} width={20} /> : 'Update Profile'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
