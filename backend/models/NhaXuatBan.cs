using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend;
[Table("NhaXuatBan")]
public partial class NhaXuatBan
{
    public int Id { get; set; }

    public string? Tennhaxuatban { get; set; }

    public virtual ICollection<Dbosach> Dbosaches { get; set; } = new List<Dbosach>();
}
