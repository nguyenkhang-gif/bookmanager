using System;
using System.Collections.Generic;

namespace backend;

public partial class YeuThich
{
    public int Sachid { get; set; }

    public string? Userid { get; set; }

    public virtual TaiKhoan? User { get; set; }
}
