using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend;

[Table("ChuDe")]
public partial class ChuDe
{
    public int? Id { get; set; }

    public string? Tenchude { get; set; }

    // public virtual ICollection<Dbosach> Dbosaches { get; set; } = new List<Dbosach>();
}
