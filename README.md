# API del Sistema de Adopción

Esta API está diseñada para gestionar citas para adopciones de mascotas. Incluye funcionalidades para crear, actualizar y listar citas, así como gestionar la información del usuario.

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

## Endpoints de la API

### Citas

- **Crear Cita**
  - **URL:** `/api/appointment/createAppointment`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "date": "2023-10-15T14:48:00.000Z",
      "status": "CREATED",
      "pet": "<pet_id>",
      "user": "<user_id>"
    }
    ```

### Usuarios

- **Registrar Usuario**
  - **URL:** `/api/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/api/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Obtener Usuario por ID**
  - **URL:** `/api/user/findUser/:uid`
  - **Método:** `GET`

- **Eliminar Usuario**
  - **URL:** `/api/user/deleteUser/:uid`
  - **Método:** `DELETE`

- **Actualizar Contraseña del Usuario**
  - **URL:** `/api/user/updatePassword/:uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "newPassword": "string"
    }
    ```

### Mascotas

- **Registrar Mascota**
  - **URL:** `/api/pet/addPet`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "description": "string",
      "age": "number",
      "type": "string",
      "keeper": "string"
    }
    ```

- **Obtener Mascota por ID**
  - **URL:** `/api/pet/findPet/:id`
  - **Método:** `GET`

- **Eliminar Mascota**
  - **URL:** `/api/pet/deletePet/:id`
  - **Método:** `DELETE`

## Funcionalidades Adicionales

Las siguientes funcionalidades necesitan ser desarrolladas:

1. **Actualizar Foto del Usuario**
  - **URL:** `/api/user/updateImage/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    ![image](https://github.com/user-attachments/assets/67e246f0-e4f1-49d5-b83b-3de337de5fe7)
    
    ```

2. **Listar Citas**
  - **URL:** `/api/appointment/`
  - **Método:** `GET`
  - **Resultado:**
    ```json
    ![image](https://github.com/user-attachments/assets/519ee6b6-6d3d-4094-93f4-492978a59e15)
  
    ```

3. **Actualizar Cita**
  - **URL:** `/api/appointment/updateAppointment/:id`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "date": "2023-10-15T14:48:00.000Z", <-- Nueva fecha
      "status": "CREATED", <-- Nuevo estatus
      "pet": "<pet_id>", <-- Nuevo id
      "user": "<user_id>" <-- Nuevo id
    }
    ```
     
4. **Cancelar Cita**
  - **URL:** `/api/appointment/cancelAppointment/:id`
  - **Método:** `DELETE`
  - **Cuerpo:**
    ```json
    ![image](https://github.com/user-attachments/assets/e6a01e13-fe97-4a3d-ab96-92b911044834)

    ```
