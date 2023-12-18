import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  removeCtegorie,
  searchCategories,
  selectCategories,
  totalPages,
} from "../../store/CategorieSlice";
import EditCategorie from "./EditCategorie";
import AddCategorie from "./AddCategorie";
export default function Categorie() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const totalPage = useSelector(totalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(fetchCategories(1));
  }, [dispatch]);

  const handleDelete = (fournisseur) => {
    dispatch(removeCtegorie(fournisseur));
  };
  const handelPaginate = (page) => {
    if(search!==""){
      dispatch(searchCategories({ words: search, page: page }));
      
      setCurrentPage(page);
    }else{
      if(currentPage>=totalPage){ 
        setCurrentPage(1);
      dispatch(fetchCategories(1));
      }else{
      dispatch(fetchCategories(page));
      setCurrentPage(page);
    }
    }

  };
  const handleSearch = () => {
    if(search===""){
      dispatch(fetchCategories(1))
    }else{
      setCurrentPage(1)
      dispatch(searchCategories({ words: search, page: 1 }));
    }
  };
  const renderPaginationLinks = () => {
    if (totalPage < 5)
      return Array.from({ length: totalPage }, (_, index) => index + 1);
    const maxLinksToShow = 5;
    const halfMaxLinksToShow = Math.floor(maxLinksToShow / 2);

    let startIdx = currentPage - halfMaxLinksToShow;
    let endIdx = currentPage + halfMaxLinksToShow;

    if (startIdx < 1) {
      startIdx = 1;
      endIdx = maxLinksToShow;
    }

    if (endIdx > totalPage) {
      endIdx = totalPage;
      startIdx = totalPage - maxLinksToShow + 1;
    }

    return Array.from(
      { length: endIdx - startIdx + 1 },
      (_, index) => startIdx + index
    );
  };
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Fournisseur Data</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Share
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <AddCategorie />
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn btn-outline-primary"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="table-responsive small">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) &&
              categories.map((categorie) => (
                <tr key={categorie.id}>
                  <td>{categorie.id}</td>
                  <td>{categorie.nom}</td>
                  <td>{categorie.description}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(categorie)}
                      className="btn btn-outline-danger"
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                  </td>
                  <td>
                    <EditCategorie categorieInfo = {{
                      id: categorie.id,
                      nom: categorie.nom,
                      description: categorie.description
                    }} />
                    {/* <EditFournisseur
                      fournisseurInfo={{
                        id: fournisseur.id,
                        nom: fournisseur.nom,
                        code_fournisseur: fournisseur.code_fournisseur,
                        tel: fournisseur.tel,
                        fax: fournisseur.fax,
                        mail: fournisseur.mail,
                        adresse: fournisseur.adresse,
                      }}
                    /> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li
              class="page-item"
              onClick={() => handelPaginate(currentPage - 1)}
            >
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {renderPaginationLinks().map((page) => (
              <li
                onClick={() => handelPaginate(page)}
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <a href="#" className="page-link">
                  {page}
                </a>
              </li>
            ))}
            <li
              class={
                currentPage === totalPage ? "page-item disabled" : "page-item"
              }
              onClick={() => handelPaginate(currentPage + 1)}
            >
              <a
                class={
                  currentPage === totalPage ? "page-link disabled" : "page-link"
                }
                href="#"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
