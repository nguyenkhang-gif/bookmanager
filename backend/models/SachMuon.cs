using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend;
[Table("SachMuon")]
public partial class SachMuon
{

    public int? id { get; set; }

    public int? Sachid { get; set; }

    public int? Soluong { get; set; }

    public int? Phieumuonid { get; set; }

    public virtual PhieuMuon? Phieumuon { get; set; }

    public virtual Dbosach? Sach { get; set; }
}
