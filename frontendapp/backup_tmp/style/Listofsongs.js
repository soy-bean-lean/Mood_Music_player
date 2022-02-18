import styled from "styled-components";

export const SongsListCategory = styled.div`
.button_category {
    border: none;
    padding:5px;
    margin:10px;
    transition: 0.2s;
    border-radius:20px;
    width:100px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .button_category:hover{
    transition: 0.2s;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color:#466ef7;
  }
  ._div_down_bar_song_list{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius:10px;
    padding:10px;
  }
  ._div_down_bar_song_list:hover{
    background-color:#f1fffe;
  }
  .button_category_disabled{
    border: none;
    padding:5px;
    margin:10px;
    transition: 0.2s;
    border-radius:20px;
    width:100px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .button_category_disabled:hover{
    // background-color:rgb(212 213 88);
    background-color:#e8e4e2;
  }
  .songs_play_button{
    border: none;
    padding: 5px;
    margin: 10px;
    transition: 0.2s;
    border-radius:20px;
    width:35px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .songs_play_button:hover{
    background-color:aqua;
    width:40px;
  }
`;

