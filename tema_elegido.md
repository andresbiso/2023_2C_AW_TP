# TP - AW - 2C 2023

# Propuesta
Se propone un sistema que permita la administración de un blog.

# Requerimientos Funcionales
- El sistema debe contar con al menos un CRUD
- El sistema debe tener una funcionalidad que utilice más de una tabla para obtener el resultado
- El sistema debe tener alguna funcionalidad más compleja como el caso de un reporte

# Visión General del Sistema
- El sistema tiene usuarios (CRUD de usuario)
- Cada usuario tiene uno o más blogs asociados (CRUD de blogs)
- Cada blog tiene uno o más artículos asociados (CRUD de artículos)
- Cada artículo puede tener comentarios (CRUD de comentarios)
- Se debe poder obtener una lista con los usuarios del sistema
- Se debe poder obtener una lista con los blogs de un usuario
- Se debe poder obtener una lista con los artículos de un blog
- Se debe poder obtener una lista con los comentarios de un artículo
- Se debe poder generar un reporte para un usuario particular que devuelva:
  - Cantidad de blogs
  - Cantidad de artículos
  - Se pueden agregar otros valores
