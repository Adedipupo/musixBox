import React, { useContext } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import flowClass from './Flow.module.scss';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { IconContext } from 'react-icons';
import { AiFillFire } from 'react-icons/ai';
// import useMusicPlayer from '../../hooks/useMusicPlayer';
// import SMgreen from '../../asset/homepageImages/SMgreen.png'
import '../Navbar/Dropdown.css';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';
import { MusicPlayerContext } from '../../context/MusicPlayerContext';

interface FlowsType {
  image: string;
  playIcon: string;
  bgImg: string;
  color: string;
  pauseIcon?: string;
  clickHandle: () => void;
  playing: boolean;
  description: string;
  title: string;
  name: string;
  id?: string;
  grad: string;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#3a3a3d',
    color: '#FFF',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(13),
  },
}))(Tooltip);

function Flows(prop: FlowsType) {
  // const { toggleMusicPlay, playing } = useMusicPlayer();
  const history = useHistory();
  const songCtx = useContext(MusicPlayerContext);
  let toolTipMsg = '';
  const msg =
    typeof songCtx.currentSong?.artist === 'string' ? songCtx.currentSong?.artist : songCtx.currentSong?.artist?.name;
  const controlMusicCurrentSong = `${songCtx.currentSong?.title} (${msg})`;

  const handleImageClick = (event: any) => {
    event.stopPropagation();
    history.push(`/playlist/${prop.id}`);
  };

  switch (prop.title) {
    case 'Control':
      toolTipMsg = !controlMusicCurrentSong.includes('undefined')
        ? controlMusicCurrentSong
        : 'Play music directly from here';
      break;
    case 'Create':
      toolTipMsg = 'Create your personal playlist';
      break;
    case 'Popular':
      toolTipMsg = 'View the most popular playlists';
      break;
    default:
      toolTipMsg = '';
      break;
  }

  return (
    // " linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
    // url('images/background.jpg');"
    <div className={flowClass.Big_card} style={{ backgroundImage: `${prop.grad}, url(${prop.bgImg})` }}>
      <div className={flowClass.SMgreen}>
        <img src={prop.image} onClick={handleImageClick} className={flowClass.SMgreenImg} alt='bg' />
        {prop.name === 'popular-playlist' ? (
          <Link
            to={{
              pathname: '/playlists/mostPopular',
            }}
          >
            <div className={flowClass.fa_play}>
              <HtmlTooltip placement='top-start' title={toolTipMsg} arrow TransitionComponent={Zoom} leaveDelay={700}>
                <i className={!prop.pauseIcon ? prop.playIcon : prop.playing ? prop.pauseIcon : prop.playIcon}></i>
              </HtmlTooltip>
            </div>
          </Link>
        ) : (
          <div className={flowClass.fa_play} onClick={prop.clickHandle}>
            <HtmlTooltip placement='top-start' title={toolTipMsg} arrow TransitionComponent={Zoom} leaveDelay={700}>
              <i className={!prop.pauseIcon ? prop.playIcon : prop.playing ? prop.pauseIcon : prop.playIcon}></i>
            </HtmlTooltip>
          </div>
        )}
      </div>
      <div className={flowClass.text}>
        <h1 style={{ color: `${prop.color}`, fontWeight: 'bolder' }}>{prop.title}</h1>
        {prop.title === 'Control' && <p className={flowClass.text_title}> Player</p>}
        {prop.title === 'Create' && <p className={flowClass.text_title}> Playlist</p>}
        {prop.title === 'Popular' && <p className={flowClass.text_title}> Playlist</p>}
        {prop.title === 'Popular' ? (
          <Link to={`/playlist/${prop.id}`}>
            <motion.div
              className={flowClass.text_two}
              initial='out'
              animate='in'
              exit='out'
              variants={pageTransition}
              transition={transit}
            >
              <IconContext.Provider value={{ color: 'red' }}>
                {prop.description && (
                  <div>
                    <AiFillFire />
                  </div>
                )}
              </IconContext.Provider>
              <p>{prop.description}</p>
            </motion.div>
          </Link>
        ) : (
          <p className={flowClass.text_two}>{prop.description}</p>
        )}
      </div>
    </div>
  );
}
export default Flows;
