using System;
using System.Collections.Generic;

namespace backend;

public partial class PhieuMuon
{
    public int Id { get; set; }

    public DateTime? Ngaymuon { get; set; }

    public string? Userid { get; set; }

    public DateTime? Ngaytra { get; set; }

    public virtual ICollection<SachMuon> SachMuons { get; set; } = new List<SachMuon>();

    public virtual TaiKhoan? User { get; set; }
}
