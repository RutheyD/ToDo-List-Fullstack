using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);
//context-services
 
  builder.Services.AddDbContext<ToDoDbContext>(options =>
                options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"), 
                new MySqlServerVersion(new Version(8, 0, 0))));
//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
// builder.Services.AddCors(options =>
// {
//     options.AddDefaultPolicy(builder =>
//     {
//         builder.AllowAnyOrigin()
//                .AllowAnyMethod()
//                .AllowAnyHeader();
//     });
// });
//swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }
app.UseCors("AllowAll");
// app.UseCors();
app.UseHttpsRedirection();

app.MapGet("/", () => "Welcome to the ToDo API!");

app.MapGet("/items", async (ToDoDbContext context) =>{
 var items = await context.Items.ToListAsync();
return Results.Ok(items);
});

app.MapPut("/items/{id}",async(int id,bool iscomplete,ToDoDbContext context)=>{
var item = await context.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    item.IsComplete = iscomplete;

    await context.SaveChangesAsync();
    return Results.NoContent();
});
app.MapPost("/items",async([FromBody]Item item,ToDoDbContext context)=>{
 context.Add(item);
 await context.SaveChangesAsync();
 return Results.Created($"/items/{item.Id}", item);
});
app.MapDelete("/items/{id}", async (int id,ToDoDbContext context)=>{
var tmpItem = await context.Items.FindAsync(id);
if(tmpItem is null)
    return Results.NotFound("Item not found!!");
 context.Items.Remove(tmpItem);
 await context.SaveChangesAsync();
 return Results.NoContent();
});

app.Run();
