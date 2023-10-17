using System;
using System.Collections.Generic;

namespace backend;

public partial class ChuDe
{
    public int Id { get; set; }

    public string? Tenchude { get; set; }

    public virtual ICollection<Dbosach> Dbosaches { get; set; } = new List<Dbosach>();
}
