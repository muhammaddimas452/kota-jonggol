import React, { useState, useEffect } from 'react'
import Nav from '../Nav'
import axios from '../../../api/axiosClient'
import { NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import logo from '../assets/jonggol.png'
import '../css/main.min.css'
import '../vendors/bootstrap/dist/css/bootstrap.min.css'
import '../vendors/themify-icons/css/themify-icons.css'


export default function PemerintahDesa(props) {
    const [pemerintah, setPemerintah] = useState();
    const [loading, setLoading] = useState(false);
    const deleteCategory = (e, jabatan_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"
        axios.delete(`/jabatan/delete/${jabatan_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove()
            } else if (res.data.status === 500) {
                swal("Success", res.data.message, "Success");
                thisClicked.innerText = "Deleting"
            }
        });
    }
    const getPemerintah = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`/pemerintahdesa`,)
            setLoading(false)
            setPemerintah(res.data)
        }
        catch (err) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getPemerintah();
    }, [props])

    return (
        <div className='page-wrapper'>
            <Nav />
            <div className="content-wrapper">
                {/* START PAGE CONTENT*/}
                <div className="page-heading">
                    <h1 className="page-title">Data Pemerintah Desa</h1>

                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html"><i className="la la-home font-20" /></a>
                        </li>
                        <li className="breadcrumb-item">DataTables</li>
                    </ol>
                </div>
                <div className="page-content fade-in-up">
                    <div className="ibox">
                        <div className="ibox-head">
                            <div className="ibox-title">Data Pemerintah Desa</div>
                            <NavLink href="/tambahpemerintah"><button className='genric-btn info radius'>Tambah Data</button></NavLink>
                        </div>
                        <div className="ibox-body">
                            <table className="table table-striped table-bordered table-hover" id="example-table" cellSpacing={0} width="100%">
                                <thead>
                                    <tr>
                                        <th className="">Nama</th>
                                        <th className="">Jabatan</th>
                                        <th className="">Foto</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th className="">Nama</th>
                                        <th className="">Jabatan</th>
                                        <th className="">Foto</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {pemerintah?.map((pemerintah, index) => (
                                        <tr key={index}>
                                            <td>{pemerintah.nama}</td>
                                            <td>{pemerintah.jabatan.nama_jabatan}</td>
                                            <td className='text-center'><img className='responsive' style={{ width: 100, height: 'auto' }} src={pemerintah.gambar_pemerintah} alt="" /></td>
                                            <td className='text-center'>
                                                <Link to={`/editpemerintah/${pemerintah.id}`}>
                                                    <button className="genric-btn success radius">Edit</button>
                                                </Link>
                                                <button className="genric-btn danger radius ml-3" onClick={(e) => deleteCategory(e, pemerintah.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <footer className="page-footer">
                    <div className="font-13">2018 © <b>AdminCAST</b> - All rights reserved.</div>
                    <div className="to-top mr-5"><FontAwesomeIcon icon={faArrowUp} className="text-dark" /></div>
                </footer>
            </div>
        </div>
    )
}