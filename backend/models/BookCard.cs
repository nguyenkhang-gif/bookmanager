using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models;

    [Table("BookCard")]
public partial class BookCard
{
    public int Id { get; set; }

    public int? BookId { get; set; }

    public string? BookName { get; set; }

    public string? AuthName { get; set; }

    public string? Category { get; set; }
}
