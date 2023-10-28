using System;
using System.Collections.Generic;

namespace backend;

public partial class SachMuon
{
    public int Sachmuonid { get; set; }

    public int? Sachid { get; set; }

    public int? Soluong { get; set; }

    public int? Phieumuonid { get; set; }

    public virtual PhieuMuon? Phieumuon { get; set; }

    public virtual Dbosach? Sach { get; set; }
}
