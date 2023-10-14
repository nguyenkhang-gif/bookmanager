using System;
using System.Collections.Generic;

namespace backend.models;

public partial class Review
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int BookId { get; set; }

    public int Rating { get; set; }

    public string Comment { get; set; } = null!;
}
