using System;
using System.Collections.Generic;

namespace backend;

public partial class NhaXuatBan
{
    public int Id { get; set; }

    public string? Tennhaxuatban { get; set; }

    public virtual ICollection<Dbosach> Dbosaches { get; set; } = new List<Dbosach>();
}
