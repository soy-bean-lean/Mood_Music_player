import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import { _save_and_play_song_from_list_} from '../features/Pass_data'
// import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Table_scroll } from '../style/Table_scroll'
const ListOfMusic = () => {
    const _songs_from_server_ = useSelector((state) => state._PASS_LIST_ID_SONGS_.Pass_id_for_song)
    // console.log("songs-----------")
    // console.log(_songs_from_server_)
    // console.log("songs-----------")
    // songs name	singer

  return (
      <>
      <Table_scroll>
      <div className="table_scroll">
        <table className="table table-bordered table-dark">
            <thead>
                <tr>
                <th scope="col">Songs name</th>
                <th scope="col">Singer</th>
                </tr>
            </thead>
            <tbody>
            { _songs_from_server_.map((item,index) => {
                return (
                        <tr key={index}>
                            <td>{item.song_name}</td>
                            <td>{item.artist_name}</td>
                        </tr>
                    )
            })}
            </tbody>
            </table>
        </div>
        </Table_scroll>
        </>
  )
};

export default ListOfMusic;
