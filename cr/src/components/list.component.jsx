import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function List() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios.get(`http://localhost:8000/api/products`).then(({ data }) => {
      setProducts(data);
    });
  };

  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "Want To Delete This Post  ???",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log(id);
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/products/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: "Post Deleted Successfully !!!",
        });
        fetchProducts();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  return (
    <>
      <div className="container-fluid pt-2 pb-2">
        <div className="row">
          <div className="col-12">
            <Link
              className="btn btn-primary mb-2 float-end"
              to={"/product/create"}
            >
              Create Post
            </Link>
          </div>
         
            <div className="col-12">
              <div
                className="d-flex row justify-content-center"
                 style={{
                  backgroundColor: "aqua",
                  border: "2px #000 solid",
                  borderRadius: "1%",
                }} 
              >

               
                 
                {products.length > 0 &&
                  products.map((row, key) => (
                   
                      <div class="ms-1 p-2 col-md-3 justify-content-center">
                        <div class="card " style={{ width: "20rem" }} id={key}>
                          <img
                            src={`http://localhost:8000/storage/product/image/${row.image}`}
                            class="card-img-top"
                            alt="..."
                          />
                          <div class="card-body">
                            <center>
                              <h5 class="card-title">Title: <u>{row.title}</u></h5>
                              <h6 class="card-title"><u>Description:</u> </h6>
                              <p class="card-text">{row.description}</p>
                              <Link
                                to={`/product/edit/${row.id}`}
                                className="btn btn-success me-2 "
                              >
                                Edit
                              </Link>
                              <Button
                                variant="danger"
                                onClick={() => deleteProduct(row.id)}
                              >
                                Delete
                              </Button>
                            </center>
                          </div>
                        </div>
                      </div>
                    
                  ))}

                 
               
              </div>
            </div>
          
        </div>
      </div>
    </>
  );
}
