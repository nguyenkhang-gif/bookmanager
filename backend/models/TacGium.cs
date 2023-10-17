using System;
using System.Collections.Generic;

namespace backend;

public partial class TacGium
{
    public int Id { get; set; }

    public string? Tentacgia { get; set; }

    public virtual ICollection<Dbosach> Dbosaches { get; set; } = new List<Dbosach>();
}
