import React from 'react';
import MusicTrendingData from './MusicTrendingData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";

const TrendingSongsList = () => {
  const _font_for_text_ = {
    fontFamily:"Comic Sans MS, Comic Sans, cursive",
}
  return (
     <>
    <br></br>
     <table className="table table-sm ">
      <thead >
          <tr className='table-active'>
          <th scope="col">
              <FontAwesomeIcon color="red" icon={faFire}></FontAwesomeIcon>
              <FontAwesomeIcon color="red" style={{marginLeft:"3px"}} icon={faFire}></FontAwesomeIcon>
          </th>
          <th scope="col" style={_font_for_text_}>Songs</th>
          <th scope="col" style={_font_for_text_}>Singer</th>
          </tr>
      </thead>
  <tbody>
  {/* Are you(Happy 😀) (sad 😔) (neutral 🙂) (fear 😳) (diguest 🤢) (surprise 😲) (angry 😡) */}
    <MusicTrendingData category="happy" _table_color_="table-primary"/>
    {/* <MusicTrendingData category="sad" _table_color_="table-info" />
    <MusicTrendingData category="surprise" _table_color_="table-warning" />
    <MusicTrendingData category="angry" _table_color_="table-danger" />
    <MusicTrendingData category="neutral" _table_color_="ddd" _text_color_="wheat"  color_from_props="#bd8ad3"/> */}
    {/* <MusicTrendingData category="diguest" _table_color_="test" _text_color_="wheat" color_from_props="black"/> */}

  </tbody>
  </table>
     </>
  )
};

export default TrendingSongsList;
