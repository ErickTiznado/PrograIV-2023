Vue.component('component-docentes',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            docentes: [],
            docente:{
                idDocente   : '',
                codigo      : '',
                nombre      : '',
                fecha       : '',
                direccion   : '',
                municipio   : '',
                departamento: '',
                telefono    : '',
                dui         : '',
                sexo        : '',
            }
        }
    },
    methods:{
        guardarDocente(){
            this.listar();
            if(this.accion==='nuevo'){
                this.docente.idDocente = new Date().getTime().toString(16);
                this.docentes.push( JSON.parse( JSON.stringify(this.docente) ) );
            }else if(this.accion==='modificar'){
                let index = this.docentes.findIndex(docente=>docente.idDocente==this.docente.idDocente);
                this.docentes[index] = JSON.parse( JSON.stringify(this.docente) );
            }else if(this.accion==='eliminar'){
                let index = this.docentes.findIndex(docente=>docente.idDocente==this.docente.idDocente);
                this.docentes.splice(index,1);
            }
            localStorage.setItem("docentes", JSON.stringify(this.docentes) );
            fetch(`private/modulos/docentes/docentes.php?accion=${this.accion}&docentes=${JSON.stringify(this.docente)}`)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
            });
            this.nuevoDocente();
        },
        eliminarDocente(docente){
            if( confirm(`Esta seguro de eliminar a ${docente.nombre}?`) ){
                this.accion='eliminar';
                this.docente=docente;
                this.guardarDocente();
            }
        },
        nuevoDocente(){
            this.accion = 'nuevo';
            this.docente.idDocente = '';
            this.docente.codigo = '';
            this.docente.nombre = '';
        },
        modificarDocente(docente){
            this.accion = 'modificar';
            this.docente = docente;
        },
        listar(){
            this.docentes = JSON.parse( localStorage.getItem('docentes') || "[]" )
                .filter(docente=>docente.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
            if( this.docentes.length<=0 && this.buscar.trim().length<=0 ){
                fetch('private/modulos/docentes/docentes.php?accion=consultar')
                .then(resp=>resp.json())
                .then(resp=>{
                    this.docentes = resp;
                    localStorage.setItem("docentes", JSON.stringify(this.docentes) );
                });
            }
        }
    },
    template: `
    <div class="row">
        <div class="col-12 col-md-6">
            <div class="card">
                <div class="card-header">REGISTRO DE DOCENTE</div>
                <div class="card-body">
                    <form id="frmDocente" @reset.prevent="nuevoDocente" v-on:submit.prevent="guardarDocente">
                        <div class="row p-1">
                            <div class="col-3 col-md-4">
                                <label for="txtCodigoDocente">Codigo:</label>
                            </div>
                            <div class="col-6 col-md-6">
                                <input required pattern="[0-9]{3}" 
                                    title="Ingrese un codigo de docente de 3 digitos"
                                        v-model="docente.codigo" type="text" class="form-control" name="txtCodigoDocente" id="txtCodigoDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-4">
                                <label for="txtNombreDocente">Nombre:</label>
                            </div>
                            <div class="col-6 col-md-6">
                                <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                    v-model="docente.nombre" type="text" class="form-control" name="txtNombreDocente" id="txtNombreDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-4">
                                <label for="txtFechaDocente">Fecha de nacimiento:</label>
                            </div>
                            <div class="col-6 col-md-6">
                                <input required 
                                    v-model="docente.fecha" type="text" class="form-control" name="txtFechaDocente" id="txtFechaDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-4">
                                <label for="txtDireccionDocente">Direccion:</label>
                            </div>
                            <div class="col-6 col-md-6">
                                <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                    v-model="docente.direccion" type="text" class="form-control" name="txtDireccionDocente" id="txtDireccionDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-4">
                                <label for="txtMunicipioDocente">Municipio:</label>
                            </div>
                            <div class="col-6 col-md-6">
                                <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                    v-model="docente.municipio" type="text" class="form-control" name="txtMunicipioDocente" id="txtMunicipioDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-4">
                                <label for="txtNDepartamentoDocente">Departamento:</label>
                            </div>
                            <div class="col-6 col-md-6">
                                <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                    v-model="docente.departamento" type="text" class="form-control" name="txtNDepartamentoDocente" id="txtNDepartamentoDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-4">
                                <label for="txtTelefonoDocente">Telefono:</label>
                            </div>
                            <div class="col-6 col-md-6">
                                <input required pattern="[0-9]{4}-[0-9]{4]"
                                    v-model="docente.telefono" type="text" class="form-control" name="txtTelefonoDocente" id="txtTelefonoDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-4">
                                <label for="txtDuiDocente">Dui:</label>
                            </div>
                            <div class="col-6 col-md-6">
                                <input required pattern="[0-9]{8}-[0-9]{1}"
                                    v-model="docente.dui" type="text" class="form-control" name="txtDuiDocente" id="txtDuiDocente">
                            </div>
                        </div>
                        <div class="row p-1">
                        <div class="col-3 col-md-4">
                            <label for="txtSexoDocente">Sexo:</label>
                        </div>
                        <div class="col-6 col-md-6">
                            <select  required           
                                    v-model="docente.sexo"  class="form-control" name="txtSexoDocente" id="txtSexoDocente">
                                    <option value="Masculino">Hombre</option>
                                    <option value="Femenino">Mujer</option>    
                                </select> 
                        </div>
                    </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-6">
                                <input class="btn btn-primary" type="submit" 
                                    value="Guardar">
                            </div>
                            <div class="col-3 col-md-3">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-12">
            <div class="card">
                <div class="card-header">LISTADO DE DOCENTES</div>
                <div class="card-body">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>BUSCAR:</th>
                                <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                    @keyup="listar()"
                                    placeholder="Buscar por codigo o nombre"></th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>FECHA DE NACIMIENTO</th>
                                <th>DIRECCION</th>
                                <th>MUNICIPIO</th>
                                <th>DEPARTAMENTO</th>
                                <th>TELEFONO</th>
                                <th>DUI</th>
                                <th>SEXO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="docente in docentes" :key="docente.idDocente" @click="modificarDocente(docente)" >
                                <td>{{ docente.codigo }}</td>
                                <td>{{ docente.nombre }}</td>
                                <td>{{ docente.fecha }}</td>
                                <td>{{ docente.direccion }}</td>
                                <td>{{ docente.municipio }}</td>
                                <td>{{ docente.departamento }}</td>
                                <td>{{ docente.telefono }}</td>
                                <td>{{ docente.dui }}</td>
                                <td>{{ docente.sexo }}</td>
                                <td><button class="btn btn-danger" @click="eliminarDocente(docente)">ELIMINAR</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
`
});