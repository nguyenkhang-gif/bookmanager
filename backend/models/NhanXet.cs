using System;
using System.Collections.Generic;

namespace backend;

public partial class NhanXet
{
    public int Id { get; set; }

    public int? Sachid { get; set; }

    public string? Tieude { get; set; }

    public string? Userid { get; set; }

    public DateTime? Ngaydang { get; set; }

    public virtual Dbosach? Sach { get; set; }

    public virtual TaiKhoan? User { get; set; }
}
