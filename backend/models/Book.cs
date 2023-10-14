using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models;
[Table("book")]
public partial class Book
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Author { get; set; } = null!;

    public string Genre { get; set; } = null!;

    public string Publisher { get; set; } = null!;

    public DateTime PublishDate { get; set; }

    public double Price { get; set; }
}
