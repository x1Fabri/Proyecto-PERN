import {Button, Card, Input, Label, Textarea} from "../components/ui"
import {useForm} from "react-hook-form"
import {useNavigate, useParams} from "react-router-dom"
import { useEffect } from "react";
import { useTareas } from "../context/TareasContext";

function TareasFormPage() {

  const {register, handleSubmit, formState: {errors}, setValue} = useForm();
  const params = useParams();
  
  const navigate = useNavigate();
  const {crearTarea, cargarTarea, editarTarea, errors: tareasErrors} = useTareas();
  const onSubmit = handleSubmit(async (data) => {
    let tarea;
    if(!params.id) {
    tarea = await crearTarea(data);
    navigate("/tareas");
    } else {
      // eslint-disable-next-line no-unused-vars
      tarea = await editarTarea(params.id, data);
      navigate("/tareas");
    }
  });

  useEffect(() => {
    if (params.id) {
      cargarTarea(params.id).then(tarea => {
        setValue("titulo", tarea.titulo);
        setValue("descripcion", tarea.descripcion);
      });
    }
  }
  , []);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {
          tareasErrors.map((error, i) => (
          <p className="bg-red-500 text-white p-2" key={i}>{error}</p>
          ))
        }
        <h2 className="text-3xl font-bold my-4">{params.id ? "Editar Tarea" : "Crear Tarea"}</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="titulo">Titulo</Label>
          <Input type= "text" placeholder="Titulo"
          autoFocus {
            ...register("titulo", {required: true})
          }/>

          <Label htmlFor="descripcion">Descripcion</Label>
          <Textarea type="text" placeholder="Descripcion"
          rows= {3}
          {...register("descripcion")}
          />
          {errors.titulo &&(
            <p className="text-red-500">El titulo es requerido</p>
          )}
          <Button>
            {params.id ? "Aceptar" : "Guardar"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default TareasFormPage